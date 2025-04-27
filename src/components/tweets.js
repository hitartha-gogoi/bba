import Tweet from "./tweet";

function Tweets(){
  return (
    <div className="relative h-screen w-full py-20 overflow-hidden">
      
      {/* Scrolling Row */}
      <div className="scroll-container">
        <div className="scroll-tweets py-10">
          {/* Cards (Manually Inserted) */}
          <Tweet />
          <Tweet />
          <Tweet />
          <Tweet />
        </div>

        {/* Duplicate Content to Ensure Seamless Loop */}
        <div className="scroll-tweets py-10">
            <Tweet />
            <Tweet />
            <Tweet />
            <Tweet />
        </div>
      </div>

    </div>
  );
};

export default Tweets
