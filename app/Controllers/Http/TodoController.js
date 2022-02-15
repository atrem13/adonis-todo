'use strict'
const Todo = use('App/Models/Todo')

class TodoController {
    async index({ request, response, view}) {
        const todos = await Todo.all()
        return view.render('todos.index', {todos: todos.rows})
    }

    create({request, response, view}){
        return view.render('todos.create')
    }

    async store({request, response, view, session}){
        const todo = new Todo();
        todo.title = request.input('title')
        todo.description = request.input('description')

        await todo.save()

      session.flash({ notification: 'New Todo Added Successfully' })
      return response.route('todos.index')
    }

    async edit({ request, view, response, params }){
        const id = params.id
        const todo = await Todo.find(id)

        return view.render('todos.edit', {todo: todo})
    }

    async update({ request, view, response, params, session }){
        const id = params.id
        const todo = await Todo.find(id)

        todo.title = request.input('title')
        todo.description = request.input('description')

        await todo.save()

        session.flash({ notification: 'Todo Data Updated Successfully' })

        return response.route('todos.index')
    }

    async delete({ request, view, response, params, session }){
        const id = params.id
        const todo = await Todo.find(id)
        await todo.delete()

        session.flash({ notification: 'Todo Data Deleted Successfully' })
        return response.route('todos.index')
    }
}

module.exports = TodoController
