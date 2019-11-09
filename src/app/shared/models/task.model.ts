export class Task {
    constructor(
        public id: String,
        public title: String,
        public description: String,
        public done: boolean = false,
        public creationDate: Date,
        public doneDate?: Date
    ){}
}