const posts = [
  {
    id: 1,
    title: "Business",
    desc: "Landscaper Position",
    icon: "BusinessIcon",
    bgColor: "bg-[#1FAF381A]",
  },
  {
    id: 2,
    title: "Job",
    desc: "Farmer Assistant All gardening affairs",
    icon: "JobIcon",
    bgColor: "bg-[#007BFF1A]",
  },
  {
    id: 3,
    title: "Needs",
    desc: "Lawn Care Help Wanted",
    icon: "NeedsIcon",
    bgColor: "bg-[#FFDD551A]",
  },
  {
    id: 4,
    title: "Community",
    desc: "Elmwood Garden Club",
    icon: "CommunityIcon",
    bgColor: "bg-[#FF6B6B1A]",
  },
];
export default function DashboardPost() {
  return (
    <>
      {posts.map((post) => {
        return (
          <div key={post.id} className="rounded-[9px] overflow-hidden shadow">
            <div className={`${post.bgColor} flex items-center p-3 gap-2`}>
              <svg className="w-[40px] h-[40px]">
                <use href={"#" + post.icon} />
              </svg>
              <h4>{post.title}</h4>
            </div>
            <div className="py-4 px-5">
              <p>Hiring for</p>
              <p>{post.desc}</p>
            </div>
          </div>
        );
      })}
    </>
  );
}
