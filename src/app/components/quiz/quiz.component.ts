import { Component, OnInit } from '@angular/core';
import quiz_questions from '../../../assets/data/quiz_questions.json'

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  title: string = ""
  questions: any
  questionSelected: any
  answers: string[] = []
  answerSelected: string = ""
  questionIndex: number = 0
  questionMaxindex: number = 0
  finished: boolean = false

  constructor() { }

  ngOnInit(): void {
    if (quiz_questions) {
      this.finished = false
      this.title = quiz_questions.title
      this.questions = quiz_questions.questions
      this.questionSelected = this.questions[this.questionIndex]
      this.questionIndex = 0
      this.questionMaxindex = this.questions.length
    }
  }

  playerChoose(value: string) {

    this.answers.push(value)
    this.nextStep()

  }

  async nextStep() {

    this.questionIndex += 1
    if (this.questionMaxindex > this.questionIndex) {
      this.questionSelected = this.questions[this.questionIndex]
    
    } else {

      const finalAnswer: string = await this.checkResult(this.answers)
      this.finished = true
      this.answerSelected = quiz_questions.results[finalAnswer as keyof typeof quiz_questions.results]
      console.log(this.answers)
    
    }

  }

  async checkResult(answers: string[]) {

    const result = answers.reduce((previous, current, index, array) => {
      if (
        array.filter(item => item === previous).length >
        array.filter(item => item === current).length
      ) {
        return previous
      } else {
        return current
      }
    })

    return result

  }



}
