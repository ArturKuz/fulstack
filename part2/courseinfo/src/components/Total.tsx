import type { TotalProps } from "../models";

export const Total = (props: TotalProps) =>  (
  <p>
    <b>
      Total exercises: {props.exercises.reduce((sum, current) => sum + current, 0)}
    </b>
  </p>
)
