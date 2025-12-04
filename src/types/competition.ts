export type CompetitionLevel = 'S+' | 'S' | 'A' | 'B' | 'C';

export interface Competition {
  id: number;
  title: string;
  level: CompetitionLevel;
  tags: string[];
  match: number;        // 匹配度 0-100
  deadline: string;
}
