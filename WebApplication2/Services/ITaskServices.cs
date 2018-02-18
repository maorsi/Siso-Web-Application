using System;
using System.Collections.Generic;
using WebApplication2.Entities;

namespace WebApplication2.Services
{
    public interface ITaskServices
    {
        Task AddTask(Task task, Guid userId);
        IEnumerable<Task> AddTasks(IEnumerable<Task> tasks, Guid userId);
        IEnumerable<Task> GetAllTaskById(Guid userId);
        Task GetTask(Guid id, Guid userId);
        void RemoveTask(Task task);
        void RemoveTasks(IEnumerable<Task> tasks);
        bool Save();
        bool TaskExists(Task task);
        Task UpdateTask(Task task);
    }
}