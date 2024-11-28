// "use server"
// import { Button } from '@/components/ui/button';
// import { auth } from '@clerk/nextjs/server';
// import axios from 'axios';
// import Link from 'next/link';
// import React from 'react';


// async function fetchSubscription(token:string ,sub_id:string) {
//   const res = await axios.get('http://localhost:8080/api/v1/user/subscription'+ sub_id ,{
//     headers: {
//       Authorization: `Bearer ${token}`,
//     }
//   });
//  return await res?.data 
// }

// export default async function Page() {
//   const { getToken } = await auth();
//   const token = await getToken();
//   // Fetch user data on the server side

//   const data = await fetchSubscription(token as string)


//   return (
//     <div>
//       <h1>Welcome, {data?.firstName || "User" }!</h1>
//       <p>Email: {data?.emailAddress || "No email provided"}</p>
//       {
//         data?.role === "USER" && !data.isSubscribed ? (
//          <>
//           <div>
//             You haven't subscribed yet. Please buy a subscription
//           </div>
//             <Link href={"/subscription/buy"}>
//             <Button>Buy a subscription</Button>
//             </Link>
//             </>
//         ) : ( 
//          <Link href={"/user/subscription"}>
//           <Button>Manage your subscription</Button>
//           </Link>
//         )
//       }
//       {/* Display additional user information if needed */}
//     </div>
//   );
// }

import React from 'react'

function page() {
  return (
    <div>page</div>
  )
}

export default page