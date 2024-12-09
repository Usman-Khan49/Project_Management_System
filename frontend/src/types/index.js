class Client {
  constructor({
    id = "",
    name = "",
    email = "",
    company = "",
    status = "active",
    projects = [],
    tags = [],
    createdAt = new Date(),
  } = {}) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.company = company;
    this.status = status; // 'active' or 'inactive'
    this.projects = projects;
    this.tags = tags;
    this.createdAt = createdAt;
  }
}

class Communication {
  constructor({
    id = "",
    clientId = "",
    type = "email", // 'email', 'meeting', or 'call'
    subject = "",
    content = "",
    date = new Date(),
    reminder = undefined,
  } = {}) {
    this.id = id;
    this.clientId = clientId;
    this.type = type;
    this.subject = subject;
    this.content = content;
    this.date = date;
    this.reminder = reminder;
  }
}

class Deliverable {
  constructor({
    id = "",
    clientId = "",
    title = "",
    description = "",
    status = "pending", // 'pending', 'in-progress', 'review', or 'completed'
    dueDate = new Date(),
    progress = 0,
  } = {}) {
    this.id = id;
    this.clientId = clientId;
    this.title = title;
    this.description = description;
    this.status = status;
    this.dueDate = dueDate;
    this.progress = progress;
  }
}

class FeedbackItem {
  constructor({
    id = "",
    clientId = "",
    score = 0,
    category = "",
    comment = "",
    date = new Date(),
  } = {}) {
    this.id = id;
    this.clientId = clientId;
    this.score = score;
    this.category = category;
    this.comment = comment;
    this.date = date;
  }
}

export { Client, Communication, Deliverable, FeedbackItem };
