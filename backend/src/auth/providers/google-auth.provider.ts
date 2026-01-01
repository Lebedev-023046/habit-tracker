// import { Injectable } from '@nestjs/common';
// import { User, UserService } from 'src/user/user.service';
// import { IdentityProvider } from './auth-provider.interface';

// @Injectable()
// export class GoogleAuthProvider
//   implements IdentityProvider<{ googleId: string; email: string }>
// {
//   constructor(private userService: UserService) {}

//   async validate(profile): Promise<User> {
//     let user = await this.userService.findByEmail(profile.email);

//     if (!user) {
//       user = await this.userService.createOAuthUser({
//         email: profile.email,
//         provider: 'google',
//         providerId: profile.googleId,
//       });
//     }

//     return user;
//   }
// }
