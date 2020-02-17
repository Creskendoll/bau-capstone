import CompPosition from "../../misc/CompPosition";

export default interface QuestionModel {
  index: number;
  question?: string;
  answer?: {
    value: number;
    position: CompPosition;
  };
  position?: CompPosition;
}
