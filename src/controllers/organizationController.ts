import { Request, Response } from "express";
import Organization from "../models/organization";
import User from "../models/user";

export const createOrganization = async (req: Request, res: any) => {
  const { name, description, userId } = req.body;

  try {
    const newOrg = await Organization.create({
      name: name,
      description: description,
      users: [userId],
    });
    return res.status(201).json({ organization_id: newOrg._id });
  } catch (error) {
    return res.status(500).json({ message: "Error creating organization" });
  }
};
export const getOrganizationById = async (req: Request, res: any) => {
  const { organization_id } = req.params;

  try {
    const organization = await Organization.findById(organization_id);
    if (organization !== null) {
      return res.status(201).json(organization);
    }
    return res
      .status(404)
      .json({ message: "There is no Organization with this id!" });
  } catch (error) {
    res.status(500).json({ message: "Error fetching organization" });
  }
};
export const getOrganizations = async (req: Request, res: any) => {
  try {
    const organizations = await Organization.find();
    if (organizations.length) {
      return res.status(201).json(organizations);
    }
    return res.status(404).json({ message: "There are no organizations yet!" });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching organizations" });
  }
};

export const updateOrganization = async (req: Request, res: any) => {
  const { organization_id } = req.params;
  const { name, description } = req.body;
  try {
    const organization = await Organization.findById(organization_id);

    if (organization !== null) {
      organization.name = name;
      organization.description = description;

      const savedChanges = await organization.save();

      return res.status(201).json({
        organization_id: savedChanges._id,
        name: savedChanges.name,
        description: savedChanges.description,
      });
    }
    return res
      .status(404)
      .json({ messge: "There is no Organization with this ID!" });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching organization" });
  }
};

export const deleteOrganization = async (req: Request, res: any) => {
  const { organization_id } = req.params;
  const organization = await Organization.findById(organization_id);

  if (organization === null) {
    return res
      .status(404)
      .json({ message: "There is no organization with this ID" });
  }

  await Organization.findByIdAndDelete(organization_id);
  return res.status(201).json({ message: "Organization deleted successfully" });
};

export const inviteUserToOrganization = async (req: Request, res: any) => {
  try {
    const { organization_id } = req.params;
    const { user_email } = req.body;

    const organization = await Organization.findById(organization_id);
    if (!organization)
      return res.status(404).json({ message: "Organization not found" });

    // Check if user is already a member
    for (let i = 0; i < organization.members.length; i++) {
      const data = organization.members[i];
      if (Object.values(data)[2] === user_email)
        return res.status(400).json({ message: "User is already a member" });
    }

    // Check if user is already exist
    const user = await User.findOne({ email: user_email });

    if (user !== null) {
      user.organization = organization.id;
      organization.members.push({
        id: user.id,
        name: user.name,
        email: user_email,
      });
      organization.invitations.push(user_email);

      await user.save();
      await organization.save();
      return res.status(200).json({ message: "User invited successfully" });
    }
    return res.status(404).json({ message: "User does not exist!" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error inviting user", error: error });
  }
};
