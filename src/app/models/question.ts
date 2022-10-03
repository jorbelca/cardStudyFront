export class Question {
  constructor(
    public id: number,
    public topic_id: number,
    public creator_id: number,
    public question: string,
    public answer1: any,
    public answer2: any,
    public answer3: any,
    public correct_answer: any,
    public n_correct: number,
    public n_incorrect: number
  ) { }
}