const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: [true, "name required"],
    },
    email: { type: String, unique: true, required: [true, "email required"] },
    password: {
      type: String,
      required: [true, "password required"],
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); //if not updated skip hashing

  // Check if the document is new or being updated (has not been save yet)
  const isNewUser = this.isNew || !this.password; // Assuming the password is not set during updates

  if (!isNewUser) return next(); //if not new record skip hashing

  // Hashing user password
  try {
    this.password = await bcrypt.hashSync(this.password, 12);
    next();
  } catch (error) {
    console.error("Error hashing password:", error);
    next(error); // Pass the error to the next middleware
  }
});

UserSchema.methods.comparePassword = async function (passwordFromBody) {
  try {
    return await bcrypt.compareSync(passwordFromBody, this.password);
  } catch (error) {
    throw error; // Pass the error to the next middleware
  }
};

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
