# Lesson 8 – Mongoose, Schemas, Models, Queries & CRUD (Complete Clean Version)

A **fully rewritten, clean, structured lesson document** containing:

* All lesson plan sections in correct order
* Explanations appropriate for beginners
* Advanced schema/model features
* Full CRUD examples
* Query types
* Clean teaching flow using Pencils Up / Pencils Down
* No personal information

---

# ✅ Recap (10 minutes)

Students should recall:

* Client → Server → Database architecture
* CRUD meanings
* Why databases exist
* MongoDB basics (documents, collections)
* JSON-like structure of MongoDB

---

# ⭐ Section 1: Mongoose (20 minutes)

## 🎯 Objectives

* Understand what Mongoose is and why it exists
* Install and connect Mongoose

## 🔍 What is Mongoose?

Mongoose is a Node.js library that:

* Adds structure to MongoDB
* Provides **schemas** to define document shapes
* Provides **models** for CRUD operations
* Supports validation, defaults, middleware, indexes, and more

## ✏️ Pencils Down – Instructor Demo

```bash
npm install mongoose
```

```js
import mongoose from "mongoose";

const MONGO_URL = "mongodb://localhost:27017/lesson8db";

mongoose.connect(MONGO_URL)
  .then(() => console.log("Connected to MongoDB ✔"))
  .catch(err => console.error(err));
```

## ✏️ Pencils Up – Students Repeat

---

# ⭐ Section 2: Schemas & Models (30 minutes)

## 🎯 Objectives

* Understand schemas
* Understand models
* Learn advanced schema options

## 🔍 What is a Schema?

Schemas define the **structure** of a document.

```js
const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: { type: String, required: true }
});
```

Schemas allow:

* Validation
* Defaults
* Rules
* Consistency

---

# ⭐ Advanced Model Options (Required, Unique, Enum, Defaults)

## 🔍 When to Use `type:` vs Shorthand

### ✔ Shorthand (only datatype)

```js
name: String,
age: Number
```

Use when no extra rules are required.

### ✔ Full Syntax (when adding rules)

```js
email: { type: String, required: true, unique: true },
age: { type: Number, min: 18 },
createdAt: { type: Date, default: Date.now }
```

### ⭐ Simple Rule

* **If only type = shorthand**
* **If validation/defaults = full `{ type: X }` syntax**

---

## 🔍 Common Schema Options

### ✔ required

Document will be rejected if missing.

```js
email: { type: String, required: true }
```

### ✔ unique

Prevents duplicates.

```js
username: { type: String, unique: true }
```

### ✔ default

```js
createdAt: { type: Date, default: Date.now }
```

### ✔ min/max

```js
age: { type: Number, min: 0, max: 120 }
```

### ✔ match

```js
email: { type: String, match: /.+@.+\..+/ }
```

### ✔ enum

```js
role: { type: String, enum: ["admin", "user"], default: "user" }
```

---

## 🔍 Example of an Advanced Schema

```js
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  age: { type: Number, min: 1 },
  role: { type: String, enum: ["admin", "user"], default: "user" },
  createdAt: { type: Date, default: Date.now }
});
```

---

## 🔍 What is a Model?

A model represents a **collection** in MongoDB and provides CRUD operations.

```js
const User = mongoose.model("User", userSchema);
export default User;
```

---

# ⭐ Section 3: Create & Read (40 minutes)

## 🎯 Objectives

* Create documents
* Query documents

## ✏️ Pencils Down – Instructor Demo

```js
await User.create({ name: "TestUser", email: "test@example.com" });
const allUsers = await User.find();
```

## ✏️ Pencils Up – Students Repeat

Tasks:

* Insert 3 users
* Find all users
* Find users with a filter

---

# ⭐ Section 4: Update & Delete (40 minutes)

## 🎯 Objectives

* Update documents
* Delete documents

## 🔧 Update Examples

```js
await User.updateOne({ name: "TestUser" }, { age: 25 });
```

```js
await User.findOneAndUpdate(
  { email: "test@example.com" },
  { age: 30 },
  { new: true }
);
```

```js
await User.findByIdAndUpdate("65abc123", { name: "UpdatedName" });
```

## ❌ Delete Examples

```js
await User.deleteOne({ name: "TestUser" });
```

```js
await User.findOneAndDelete({ email: "old@example.com" });
```

```js
await User.findByIdAndDelete("65abc123");
```

---

# ⭐ Mongoose Queries (from official docs)

## 📌 Basic Queries

```js
User.find();
User.find({ age: 20 });
User.findOne({ email });
User.findById(id);
```

## 📌 Comparison Operators

```js
User.find({ age: { $gt: 18 } });
User.find({ age: { $lt: 30 } });
User.find({ age: { $gte: 18, $lte: 30 } });
```

## 📌 Logical Operators

```js
User.find({ $or: [{ age: { $lt: 18 } }, { age: { $gt: 60 } }] });
User.find({ $and: [{ active: true }, { age: { $gt: 20 } }] });
```

## 📌 Regex Searches

```js
User.find({ name: /an/i });
```

## 📌 Projection

```js
User.find({}, "name email");
User.find().select("name -_id");
```

## 📌 Sorting

```js
User.find().sort({ age: 1 });
User.find().sort({ age: -1 });
```

## 📌 Pagination

```js
User.find().skip(10).limit(5);
```

## 📌 Count

```js
User.countDocuments({ active: true });
```

---

# ⭐ Beginner-Friendly Testing Setup

Students should NOT test inside `app.js`.
Use:

```
app.js       → DB connection only
models/*.js  → schemas + models
test.js      → CRUD testing
```

Example:

```js
import "./app.js";
import User from "./models/user.js";

async function run() {
  const created = await User.create({ name: "Tester", email: "tester@example.com" });
  console.log(created);

  const users = await User.find();
  console.log(users);
}
run();
```

---

# ✍️ Student Exercises

## ✔ Exercise 1 – Build a Product Model

Fields:

* name (String)
* price (Number)
* inStock (Boolean, default true)

## ✔ Exercise 2 – CRUD Operations

* Insert 3 products
* Read all
* Update one
* Delete one

## ✔ Exercise 3 – Queries

Write queries to:

* Find products priced under 50
* Sort products by price desc
* Find names containing a substring
* Count how many are inStock

---