import prisma from "../../config/db.config.js";
import { UserData } from "../clerk.js";

export  async function UserCreated(data:UserData) {
  try {
    const user = await prisma.user.create({
      data: {
        id: data.id,
        firstName: data.first_name || "",
        lastName: data.last_name || "",
        emailAddress: data.email_addresses
          ? data.email_addresses[0].email_address
          : "",
        avatar: data.image_url || "",
        username: data.username || "",
        lastActiveAt: data.last_active_at
          ? new Date(data.last_active_at)
          : new Date(),
        lastSignInAt: data.last_sign_in_at
          ? new Date(data.last_sign_in_at)
          : new Date(),
        isBanned: data.banned || false,
        twoFactorEnabled: data.two_factor_enabled || false,
        locked: data.locked || false,
        backupCodeEnabled: data.backup_code_enabled || false,
        createdAt: data.created_at ? new Date(data.created_at) : new Date(),
        updatedAt: data.updated_at ?  new Date(data.updated_at) : new Date() 
      },
    });

    console.log("user created", user);

    // Now insert email addresses associated with the user
    let EmailAddressId;
    if (data.email_addresses && data.email_addresses.length > 0) {
      for (let email of data.email_addresses) {
        EmailAddressId = await prisma.emailAddress.create({
          data: {
            id: email.id || "",
            emailAddress: email.email_address ? email.email_address : "",
            verification: email.verification ? email.verification.status : "",
            userId: user.id, // Link the email to the created user
            createdAt:email.created_at ? new Date(email.created_at) : new Date(),
            updatedAt:email.updated_at ? new Date(email.updated_at) : new Date()
          },
        });
      }
    }
    
    console.log("email created", EmailAddressId);

    if (data.phone_numbers && data.phone_numbers.length > 0) {
      let phoneNoId;
      for (let phone of data.phone_numbers) {
        phoneNoId = await prisma.phone.create({
          data: {
            id: phone.id || "",
            phoneNumber: phone.phone_number || "",
            isVerified: phone.verification
              ? phone?.verification.status === "verified" && true
              : false,
            userId: user.id, // Link the email to the created user
          },
        });
      }
      console.log("Phone no created ", phoneNoId);
    }

  } catch (error) {
    console.log(error)
  }
}

export  async function UserDeleted(data: UserData) {
  try {
    await prisma.user.delete({
      where: { id: data.id },
    });
  } catch (error) {
    console.log(error);
  }
}


export async function UserUpdated(data: UserData) {
  try {
    const user = await prisma.user.update({
      where: { id: data.id },
      data: {
        firstName: data.first_name,
        lastName: data.last_name,
        emailAddress:
          data.email_addresses && data.email_addresses[0].email_address,
        avatar: data.image_url,
        username: data.username,
        lastActiveAt: data.last_active_at
          ? new Date(data.last_active_at)
          : new Date(),
        lastSignInAt: data.last_sign_in_at
          ? new Date(data.last_sign_in_at)
          : new Date(),
        isBanned: data.banned,
        twoFactorEnabled: data.two_factor_enabled,
        locked: data.locked,
        backupCodeEnabled: data.backup_code_enabled,
      },
    });

    console.log("user created", user);

    // Now insert email addresses associated with the user
    let EmailaddressId
    if (data.email_addresses && data.email_addresses.length > 0) {
      for (let email of data.email_addresses) {
        EmailaddressId = await prisma.emailAddress.upsert({
          where: { id: email.id },
          update: {
            emailAddress: email.email_address,
            verification: email.verification ? email.verification.status : "",
          },
          create: {
            id: email.id || "",
            emailAddress: email.email_address || "",
            verification: email.verification ? email.verification.status : "",
            userId: user.id, // Link the email to the updated user
          },
        });
      }
    }

    if (data.phone_numbers && data.phone_numbers.length > 0) {
      for (let phone of data.phone_numbers) {
        await prisma.phone.upsert({
          where: { id: phone.id },
          update: {
            phoneNumber: phone.phone_number,
            isVerified: phone.verification
              ? phone.verification.status === "verified" && true
              : false,
          },
          create: {
            id: phone.id || "",
            phoneNumber: phone.phone_number || "",
            isVerified: phone.verification
              ? phone.verification.status === "verified" && true
              : false,
            userId: user.id, // Link the phone number to the updated user
          },
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
}
