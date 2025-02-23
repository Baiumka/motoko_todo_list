import Nat "mo:base/Nat";
import Array "mo:base/Array";
import Text "mo:base/Text";
import Principal "mo:base/Principal";
import Error "mo:base/Error";
import Bool "mo:base/Bool";
import Time "mo:base/Time";

//ToDo List
//1.Add admins permitions
//2.Edit UserContext, add OnSuccess
//3.Check how to catch errors
actor {
    
  type User = {
    id: Nat;
    nickname: Text;
    principal: Principal;      
  };

  type Task = {
    id: Nat;
    title: Text;
    descr: Text;
    created_at: Time.Time;
    user: User;//not sure, may be better use List(User, [Task])
    state: Bool;
    color: Nat;
    is_edited: Bool;
  };

  stable var users: [User] = [];
  stable var tasks: [Task] = [];//not sure, may be better use List(User, [Task])
  stable var userIdCounter: Nat = 1;
  stable var taskIdCounter: Nat = 1;

  public shared (msg) func register(nickname: Text): async () {
    let callerUser = await getUserByPrinc(msg.caller);
    switch (callerUser) {
      case (?user)
      {      
        throw Error.reject("User does not exist: " # user.nickname);
      };
      case null {
        let newUser = {
        id = userIdCounter;
        nickname = nickname;
        principal = msg.caller;
        };
        users := Array.append<User>(users, [newUser]);
        userIdCounter += 1; 
      };
    };       
  };


  public shared (msg) func addTask(title: Text, descr: Text, color: Nat): async Nat {
    //throw Error.reject("You have no Error");
    let callerUser = await getUserByPrinc(msg.caller);
    switch (callerUser) {
      case (?user)
      {
        let newTask = {
            id = taskIdCounter;
            title = title;
            descr = descr;
            created_at = Time.now();
            user = user;
            state = false;
            color = color;
            is_edited = false;
        };
        tasks := Array.append<Task>(tasks, [newTask]);
        taskIdCounter += 1; 
        return newTask.id;
      };
      case null {
        throw Error.reject("User does not exist");
      };
    };    
  };



  //not sure that this method is correct
  public shared (msg) func editTask(id: Nat, title: Text, descr: Text, color: Nat): async Task {
    let callerUser = await getUserByPrinc(msg.caller);
    switch (callerUser) {
      case (?user)
      {        
        let newTaskArray:[Task] = Array.map<Task, Task>(
          tasks,
          func(task) {
            if (task.id == id and task.user.id == user.id) {
              {                
                id = task.id;
                title = title;
                descr = descr;
                created_at = Time.now();
                user = user;
                state = false;
                color = color;
                is_edited = true;
              };
            } else {
              task;
            };
          }
        );

        tasks := newTaskArray;
        let editedTask = Array.find<Task>(tasks, func (task) = task.id == id);
        switch(editedTask)
        {
          case null
          {
            throw Error.reject("Task does not exist");
          };
          case(?task)
          {
            return task;
          };
        };


      };
      case null {
        throw Error.reject("User does not exist");
      };
    };    
  };

  //and this one
  public shared (msg) func completeTask(id: Nat): async () {
    let callerUser = await getUserByPrinc(msg.caller);
    switch (callerUser) {
      case (?user)
      {        
        let newTaskArray:[Task] = Array.map<Task, Task>(
          tasks,
          func(task) {
            if (task.id == id and task.user.id == user.id) {
              {                
                id = task.id;
                title = task.title;
                descr = task.descr;
                created_at = task.created_at;
                user = user;
                state = not task.state;
                color = task.color;
                is_edited = task.is_edited;
              };
            } else {
              task;
            };
          }
        );
        tasks := newTaskArray;
      };
      case null {
        throw Error.reject("User does not exist");
      };
    };    
  };

  //and this one
  public shared (msg) func deleteTask(id: Nat): async () {
    let callerUser = await getUserByPrinc(msg.caller);
    switch (callerUser) {
      case (?user)
      {       
        let deleteTask = Array.find<Task>(tasks, func (task) = task.id == id and task.user.id == user.id);     
        switch(deleteTask)
        {
          case (?delTask)
          {
            let newTaskArray = Array.filter<Task>(tasks, func(task) { task.id != delTask.id });
            tasks := newTaskArray;
          };
          case (null)
          {
            throw Error.reject("Its not your task");
          };
        };
        
      };
      case null {
        throw Error.reject("User does not exist");
      };
    };    
  };



  public shared (msg) func getUser(): async ?User {       
    let callerUser = await getUserByPrinc(msg.caller);     
    switch (callerUser) {
      case (?user) 
      {        
        return ?user;
      };
      case (null) {      
        return null;
      };      
    }
  };

  public shared (msg) func getMyTasks(): async [Task] {
    let callerUser = await getUserByPrinc(msg.caller);
    switch (callerUser) {
      case (?user)
      {
        return Array.filter<Task>(tasks, func (task) = task.user == user);
      };
      case null {
        throw Error.reject("User does not exist");
      };
    };    
  };


  private func getUserByPrinc(caller: Principal): async ?User {        
    let userOpt = Array.find<User>(users, func (user) = user.principal == caller);
    switch (userOpt) {
      case (?user) 
      {        
        return ?user;
      };
      case (null) {      
        return null;
      };      
    }
  }; 


  public func reset() {
    users := [];
    userIdCounter := 0;
  };

  public query func getUsers(): async [User] {
    return users;
  };

  public query func getTasks(): async [Task] {
    return tasks;
  };

  

};
