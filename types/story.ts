export interface StoryFormData {
  name: string;
  age: string;
  hobby: string;
  favoriteFood: string;
  artStyle: string;
}

export interface GeneratedStory {
  title: string;
  visualDNA: string;
  seed: number;
  pages: string[];
}
