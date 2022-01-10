import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from "config";

export interface UserInput {
    email: string;
    firstName?: string;
    lastName?: string;
    password: string;
}

export interface UserDocument extends UserInput, mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
    comparePassword(candidatePassword: string): Promise<Boolean>;
}

const userSchema = new mongoose.Schema(
    {
        email: { type: String, required: true, unique: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        password: { type: String, required: true }
    }, 
    {
        timestamps : true
    }
);

// PASSWORD HASH
userSchema.pre("save", async function (next) {
    let user = this as UserDocument;

    // HASH THE PASSWORD IF IT'S CREATE/MODIFIED
    if(!user.isModified("password")) {
        return next();
    }

    // ADDITIONAL RANDOM DATA
    const salt = await bcrypt.genSalt(config.get<number>('saltWorkFactor'));

    const hash = await bcrypt.hashSync(user.password, salt);

    // REPLACING THE PASSWORD WITH HASH
    user.password = hash;

    return next();    
});

// USE FOR COMPARE THE PASSWORD
userSchema.methods.comparePassword = async function (
    candidatePassword: string
): Promise<boolean> {
    const user = this as UserDocument;

    return bcrypt.compare(candidatePassword, user.password).catch((e) => false);
};

const UserModel = mongoose.model<UserDocument>("User", userSchema);

export default UserModel;