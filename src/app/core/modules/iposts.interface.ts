
export interface Iposts {
  _id: string;
  body: string;
  image: string;
  privacy: string;
  user: User;
  sharedPost: SharedPost|null;
  likes: any[];
  createdAt: string;
  commentsCount: number;
  topComment: null;
  sharesCount: number;
  likesCount: number;
  isShare: boolean;
  id: string;
  bookmarked: boolean;  
}

//  export interface User {
//   _id: string;
//   name: string;
//   username: string;
//   photo: string;
// }





// export interface Iposts {
//   _id: string;
//   body: string;
//   privacy: string;
//   user: User;
//   sharedPost: SharedPost | null;
//   likes: any[];
//   createdAt: string;
//   commentsCount: number;
//   topComment: null;
//   sharesCount: number;
//   likesCount: number;
//   isShare: boolean;
//   id: string;
//   bookmarked: boolean;
// }

// export interface SharedPost {
//   _id: string;
//   body: string;
//   privacy: string;
//   user: User;
//   sharedPost: null;
//   likes: any[];
//   createdAt: string;
//   commentsCount: number;
//   topComment: null;
//   sharesCount: number;
//   likesCount: number;
//   isShare: boolean;
//   id: string;
// }

// export interface User {
//   _id: string;
//   name: string;
//   username: string;
//   photo: string;
// }





export interface SharedPost {
  _id: string;
  body: string;
  image: string;
  privacy: string;
  user: User;
  sharedPost: null;
  likes: any[];
  createdAt: string;
  commentsCount: number;
  topComment: null;
  sharesCount: number;
  likesCount: number;
  isShare: boolean;
  id: string;
   bookmarked: boolean;  
}

export interface User {
  _id: string;
  name: string;
  username: string;
  photo: string;
}


