import type { CourseProps, PartProps } from "../models";
import { Content } from "./Content";
import { Header } from "./Header";
import { Total } from "./Total";

export const Course = ({ name, parts }:  CourseProps ) => (
  <>
    <Header course={name} />
    <Content parts={parts} />
    <Total exercises={parts.map((item: PartProps) => item.exercises)} />
  </>
)
