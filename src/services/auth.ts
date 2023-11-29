import {Product} from "../schemas/product.entity";
import {User} from "../schemas/user.entity";

export async function regUserService(email, password) {


  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return { status: 409, message:'User with this email already exists.'};
  }

  const newUser = new User({ email, password });

  await newUser.save();

  return {
    status: 201,
    message: 'User registered successfully.',
    userid: newUser.id
  };
}
