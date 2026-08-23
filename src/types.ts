export interface ProjectItem {
  id: number | string;
  title: string;
  category: string;
  description: string;
  image: string;
  liveUrl: string;
  githubUrl: string;
  themeColor?: string;
}

export interface ProjectsData {
  title: string;
  description: string;
  items: ProjectItem[];
}
