import type { PartProps } from "./part.model";

export interface CourseProps {
  id: number,
  name: string,
  parts: PartProps[]
}