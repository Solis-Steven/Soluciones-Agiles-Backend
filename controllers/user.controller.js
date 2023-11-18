import UserModel from "../models/User.model.js";

export const login = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await UserModel.findOne({ email })
            .select("-createdAt -updatedAt -__v -_id");

            
            if (!user) {
                const newUser = new UserModel(req.body);                
                await newUser.save();
                
                return res.json(newUser);
            }

        return res.json(user);
    } catch (error) {
        return res.status(500).json({ error: "Login error" });
    }
}

export const getUsers = async (req, res) => {
    try {
        const users = await UserModel.find();
        return res.json({ users });
    } catch (error) {
        return res.status(500).json({ error: "Get users error" });
    }
}

export const changeRole = async (req, res) => {
    const { userId, newRole } = req.body;

    try {
        const user = await UserModel.findById(userId);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        user.role = newRole;
        await user.save();

        return res.json({ msg: "User role changed successfully" });
    } catch (error) {
        return res.status(500).json({ error: "Change role error" });
    }
};

export const getEmails = async (req, res) => {
    try {
      const users = await UserModel.find({ role: { $ne: 'Cliente' } })
        .select("-createdAt -updatedAt -__v -_id -role");
  
      return res.json({ users });
    } catch (error) {
      return res.status(500).json({ error: "Get emails error" });
    }
};