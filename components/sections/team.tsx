import Image from "next/image";
import { teamMembers } from "@/data/teamUtils";

export default function Team() {
  return (
    <section id="team" className="py-20 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h3 className="text-red-500 text-sm font-semibold tracking-widest mb-4">
          THE ARCHITECTS
        </h3>
        <h2 className="text-5xl md:text-6xl font-bold text-white">
          MEET THE LEADERSHIP
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {teamMembers.map((member) => (
          <div key={member.id} className="text-center">
            <div className="relative mx-auto mb-6 h-56 w-56 overflow-hidden rounded-full border border-white/15 bg-gray-800">
              <Image
                src={member.image}
                alt={member.name}
                fill
                sizes="224px"
                className="object-cover object-[center_18%] scale-110"
              />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
            <p className="text-red-500 text-xs font-semibold tracking-widest">
              {member.position}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}