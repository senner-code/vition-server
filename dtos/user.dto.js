export default class UserDto {
  email
  boards
  id
  username
  activated

  constructor(model){
    this.email = model.email
    this.id = model.id
    this.boards = model.boards
    this.username = model.username
    this.activated = model.activated
  }
}