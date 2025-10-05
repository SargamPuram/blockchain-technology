# Student Registry Smart Contract Tutorial

## How to Run This in Remix IDE 🚀
Follow these steps exactly.

---

## Step 1: Setup
1. Go to [Remix IDE](https://remix.ethereum.org).  
2. Create a new file named `StudentRegistry.sol`.  
3. Copy and paste the contract code into this file.

---

## Step 2: Compile (The Spell-Check) ✨
1. Go to the **Solidity Compiler** tab on the left.  
2. Click the big blue **Compile StudentRegistry.sol** button.  
3. Wait for the green checkmark ✅ to appear on the compiler icon.

---

## Step 3: Deploy (Open for Business) 🏦
1. Go to the **Deploy & Run Transactions** tab.  
2. Make sure **ENVIRONMENT** is set to `Remix VM (Shanghai)`.  
3. Click the orange **Deploy** button.  
4. Your contract will appear under **Deployed Contracts**. Click the arrow to expand it.

---

## 🧪 Testing Every Function: A Step-by-Step Guide

We will pretend to be two different students, **Alice** and **Bob**, to test the security.

---

### Transaction 1: Alice Registers Herself
- **Who:** Use the **FIRST account** in the ACCOUNT dropdown (Alice).  
- **Action:** Find the `addStudent` function.  
- **Inputs:**  
  ```text
  _name: "Alice"
  _rollno: 101
  _class: "Grade 5"
Click: The orange transact button.

Check: Use getStudentById with _id: 0. You should see Alice's info and her address.

Alice is now Student ID 0.

Transaction 2: Bob Registers Himself
Who: Switch to the SECOND account (Bob).

Action: Find addStudent.

Inputs:

text
Copy code
_name: "Bob"
_rollno: 102
_class: "Grade 6"
Click: The orange transact button.

Check: Use getStudentById with _id: 1. You should see Bob's info.

Bob is now Student ID 1.

Transaction 3: Check the Total Students
Action: Click the blue getTotalStudents button.

Result: It should show 2.

Transaction 4: THE SECURITY TEST (Update)
The Hacker (Bob tries to change Alice's record)
Stay on Bob's account.

Go to updateStudent.

Inputs:

text
Copy code
_id: 0
_newName: "Hacker"
_newClass: "Hacked"
Click transact.

Result: It will FAIL with an error "You are not the owner...". Security works! ✅

The Owner (Alice updates her own record)
Switch back to Alice's account.

Go to updateStudent.

Inputs:

text
Copy code
_id: 0
_newName: "Alice"
_newClass: "Grade 7"
Click transact.

Result: It will SUCCEED.

Check: Use getStudentById for ID 0 to see the updated class.

Transaction 5: THE SECURITY TEST (Delete)
The Hacker (Bob tries to delete Alice's record)
Switch to Bob's account.

Go to deleteStudent.

Input: _id: 0 (Alice's ID).

Click transact.

Result: It will FAIL.

The Owner (Alice deletes her own record)
Switch back to Alice's account.

Go to deleteStudent.

Input: _id: 0.

Click transact.

Check:

Click getTotalStudents. It should now show 1.

Use getStudentById for ID 0 — it should show Bob's info, because he was moved into Alice's old spot.

🚨 Troubleshooting: The "Invalid Opcode" Error
This is the most common error. It means you asked for something that doesn't exist.

Cause: Using getStudentById with an ID not in the list.
Example: You have 2 students (IDs 0 and 1) but ask for ID 2.

How to Fix:
Click the getTotalStudents button to see how many students exist.

Only valid IDs are 0 to getTotalStudents - 1.

Retry getStudentById with a valid ID.

If all else fails, delete the deployed contract using the trash can icon and deploy a fresh one.
