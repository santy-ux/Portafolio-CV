import type { IncomingMessage, ServerResponse } from 'http';

interface VercelRequest extends IncomingMessage {
  body?: any;
  query?: Record<string, string | string[]>;
}

interface VercelResponse extends ServerResponse {
  status: (statusCode: number) => VercelResponse;
  json: (body: any) => VercelResponse;
  send: (body: any) => VercelResponse;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'OPTIONS') {
    return res.status(200).send('OK');
  }

  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Método no permitido. Solo se acepta POST.',
    });
  }

  try {
    const { name, email, message, _gotcha } =
      typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};

    // Protección contra spam mediante campo trampa (honeypot)
    if (_gotcha) {
      return res.status(400).json({
        success: false,
        error: 'Solicitud no procesada.',
      });
    }

    // Validaciones de datos
    if (!name || typeof name !== 'string' || !name.trim()) {
      return res.status(400).json({
        success: false,
        error: 'El nombre es obligatorio.',
      });
    }

    if (!email || typeof email !== 'string' || !email.trim()) {
      return res.status(400).json({
        success: false,
        error: 'El correo electrónico es obligatorio.',
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return res.status(400).json({
        success: false,
        error: 'Por favor ingresa un correo electrónico válido.',
      });
    }

    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({
        success: false,
        error: 'El mensaje es obligatorio y no puede estar vacío.',
      });
    }

    const cleanName = name.trim();
    const cleanEmail = email.trim();
    const cleanMessage = message.trim();
    const destinationEmail = (process.env.CONTACT_EMAIL || 'elsanty851@gmail.com').trim();

    // Reenvío a FormSubmit vía HTTP
    const formSubmitRes = await fetch(`https://formsubmit.co/ajax/${destinationEmail}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        name: cleanName,
        email: cleanEmail,
        message: cleanMessage,
        _subject: `Nuevo mensaje desde tu portafolio - ${cleanName}`,
        _template: 'table',
        _captcha: 'false',
        _honey: _gotcha,
      }),
    });

    const data = await formSubmitRes.json().catch(() => null);

    if (!formSubmitRes.ok) {
      return res.status(formSubmitRes.status || 500).json({
        success: false,
        error: data?.message || 'No se pudo enviar el mensaje a través de FormSubmit.',
      });
    }

    return res.status(200).json({
      success: true,
      message: '¡Mensaje enviado correctamente! Me pondré en contacto contigo pronto.',
    });
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : 'Error interno del servidor';
    console.error('[Contact API Exception]:', errMessage);
    return res.status(500).json({
      success: false,
      error: 'No se pudo enviar el mensaje. Por favor, inténtalo nuevamente.',
    });
  }
}
