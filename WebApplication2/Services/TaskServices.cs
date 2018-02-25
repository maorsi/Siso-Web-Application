
using SisoWebApplication.Entities;
using SisoWebApplication.Repository;
using System;
using System.Collections.Generic;
using System.Linq;


namespace SisoWebApplication.Services
{
    public class TaskServices : ITaskServices
    {
        private UserContext _context;
        public TaskServices(UserContext context)
        {
            _context = context;
        }


        public Task AddTask(Task task,Guid userId)
        {
            task.Id = Guid.NewGuid();
            task.UserId = userId;

            _context.Task.Add(task);

            return task;
        }

        public IEnumerable<Task> AddTasks(IEnumerable<Task> tasks, Guid userId)
        {
            foreach (Task task in tasks)
            {
                AddTask(task,userId);
            }
            return tasks;
        }
        public IEnumerable<Task> GetAllTaskById( Guid userId)
        {
            return _context.Task.Where(a=> a.UserId == userId);
        }
        public void RemoveTask(Task task)
        {
            _context.Task.Remove(task);
        }
        public void RemoveTasks(IEnumerable<Task> tasks)
        {
            foreach (Task task in tasks)
            {
                RemoveTask(task);
            }
        }
        public Task UpdateTask(Task task)
        {
            _context.Task.Update(task);
            return task;
        }
        public bool TaskExists(Task task)
        {
            return _context.Task.Any(a=> a.Id == task.Id);
        }
        public Task GetTask(Guid id,Guid userId)
        {
            return _context.Task.FirstOrDefault(a => a.Id == id && a.UserId == userId);
        }
        public bool Save()
        {
            return (_context.SaveChanges() >= 0);
        }


    }
}
