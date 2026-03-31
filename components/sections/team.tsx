import Image from "next/image";
import { teamMembers } from "@/data/teamUtils";

export default function Team() {
  return (
    <section id="team" className="py-14 xs:py-16 sm:py-20 px-4 xs:px-6 max-w-7xl mx-auto">
      <div className="text-center mb-10 xs:mb-12 sm:mb-16">
        <h3 className="text-red-500 text-[10px] xs:text-xs sm:text-sm font-semibold tracking-[0.2em] xs:tracking-widest mb-3 xs:mb-4">
          THE ARCHITECTS
        </h3>
        <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold text-white">
          MEET THE LEADERSHIP
        </h2>
      </div>

      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-6 xs:gap-8">
        {teamMembers.map((member) => (
          <div key={member.id} className="text-center">
            <div className="relative mx-auto mb-4 xs:mb-5 sm:mb-6 h-40 w-40 xs:h-48 xs:w-48 sm:h-56 sm:w-56 overflow-hidden rounded-full border border-white/15 bg-gray-800">
              <Image
                src={member.image}
                alt={member.name}
                fill
                sizes="(max-width: 475px) 160px, (max-width: 640px) 192px, 224px"
                className="object-cover object-[center_18%] scale-110"
              />
            </div>
            <h3 className="text-lg xs:text-xl font-bold text-white mb-1.5 xs:mb-2">{member.name}</h3>
            <p className="text-red-500 text-[10px] xs:text-xs font-semibold tracking-[0.15em] xs:tracking-widest">
              {member.position}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
