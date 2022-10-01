export class Question {
  constructor(
    public id: number,
    public topic_id: number,
    public creator_id: number,
    public question: string,
    public answers: any,
    public correct_answer: any,
    public n_correct: number,
    public n_incorrect: number
  ) { }
}