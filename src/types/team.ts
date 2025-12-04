export interface SkillSet {
  code: number;    // 0-100
  design: number;  // 0-100
  write: number;   // 0-100
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  skills: SkillSet;
  avatar: string;  // 单字母缩写
}
