import type { PartProps } from "../models";

export const Part = (props: PartProps) =>  (
  <p>
    {props.name} {props.exercises}
  </p>
)
