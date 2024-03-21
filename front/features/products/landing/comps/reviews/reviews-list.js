// import Image from "next/image";
// import { useState } from "react";
// // import ReviewCard from "comps/review-card";
// import s from "./reviews-list.module.scss";

// const ReviewsList = () => {
//   const [showWriteReviewModal, setShowWriteReviewModal] = useState(false);

//   return (
//     <>
//       <div className={`${s.reviews}`}>
//         <div className={`${s.header}`}>
//           <p>Відгуки покупців:</p>
//           <button
//             onClick={() => {
//               setShowWriteReviewModal(!showWriteReviewModal);
//             }}
//             className={`${s.write_rev_btn} btn`}
//           >
//             <div className="icon-link">
//               <p>Написати відгук </p>
//               <i className="bi bi-pencil-fill"></i>
//             </div>
//             <Image
//               className={`${s.wave}`}
//               src="/wave.svg"
//               width={100}
//               height={100}
//             ></Image>
//           </button>
//         </div>
//         <div className={`${s.reviews_list}`}>
//           {/* <ReviewCard />
//           <ReviewCard />
//           <ReviewCard /> */}
//           <button className={`${s.all_reviews_btn} btn`}>
//             Дивитись усі відгуки по товару <i className="bi bi-arrow-right"></i>
//           </button>
//         </div>
//       </div>
//       <WriteReviewModal
//         isOpen={showWriteReviewModal}
//         toggle={() => {
//           setShowWriteReviewModal(!showWriteReviewModal);
//         }}
//       />
//     </>
//   );
// };

// export default ReviewsList;
