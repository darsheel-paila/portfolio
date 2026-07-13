const PROJECTS = [
  {
    id: "scavenger",
    title: "Scavenger (in progress)",
    shortDesc:
      "A cheap aquatic trash-collecting robot I am currently designing for the LitterLoot initiative to scalably reduce plastics in lakes, ponds, and similar-sized water bodies.",
    image: "images/scavenger.png",
    alt: "Scavenger",
    sections: [
      {
        heading: "Overview",
        body: "Planning to complete the design with servo-powered trash-funneling nets, guardrails, IP68 propellers, a microcontroller, FPV camera, IR feedback system, an IMU, and a PSU. The robot is composed of PVC and Coroplast.",
      },
      {
        heading: "Development",
        body: "Add your development notes here — design iterations, prototyping milestones, testing results, and technical challenges.",
      },
    ],
  },
  {
    id: "dexter",
    title: "Dexter",
    shortDesc:
      "A 3D printed robotic hand I designed from scratch with 6 degrees of freedom, controlled real-time by processed myoelectric signals.",
    image: "images/Dexter.png",
    alt: "Dexter",
    sections: [
      {
        heading: "Overview",
        body: "The joint Dexter-CRN system placed 4th out of over 40 projects in the robotics category (ROBO) in the Dallas Regional Science and Engineering Fair. Designed in Autodesk Fusion 360.",
      },
      {
        heading: "Development",
        body: "Add your development notes here — CAD design process, myoelectric signal processing, servo control, and competition results.",
      },
    ],
    supplemental: {
      heading: "Demonstration",
      body: "Mechanical impedance, gesture localization, and latency demonstration of Dexter in a real-time video.",
      media: {
        src: "images/Dexter.gif",
        alt: "Dexter demonstration video",
      },
    },
  },
  {
    id: "scout",
    title: "S.C.O.U.T",
    shortDesc:
      "A 2-axis robot dog built in CAD and driven using Arduino, a custom PCB to handle high current draw, servos, and mechanical linkages.",
    image: "images/scout.png",
    alt: "S.C.O.U.T",
    sections: [
      {
        heading: "Overview",
        body: "Designed in Onshape with a custom PCB for high-current servo control and mechanical linkages for 2-axis movement.",
      },
      {
        heading: "Development",
        body: "Add your development notes here — PCB design, Arduino firmware, mechanical linkage design, and testing.",
      },
    ],
  },
  {
    id: "purifier",
    title: "Duomorphic Photocatalytic-SODIS Purifier",
    shortDesc:
      "A water purification system I designed through 2 major iterations to compare photocatalysis and SODIS purification methods.",
    image: "images/EEI.png",
    alt: "Duomorphic Purifier",
    sections: [
      {
        heading: "Overview",
        body: "Placed 3rd at the Dallas EEI Research Symposium. Designed in Autodesk Fusion 360 through two major design iterations.",
      },
      {
        heading: "Development",
        body: "Add your development notes here — iteration comparisons, purification testing methodology, and research findings.",
      },
    ],
  },
  {
    id: "bobby",
    title: "Bobby",
    shortDesc:
      "The full design of “Bobby,” my team’s robot, which I fully designed as the team’s CAD designer during the 2025–2026 FIRST Tech Challenge DECODE season.",
    image: "images/robotFTC.png",
    alt: "Bobby",
    sections: [
      {
        heading: "Overview",
        body: "Designed in Autodesk Fusion 360 as the team's CAD designer for the 2025–2026 FIRST Tech Challenge DECODE season.",
      },
      {
        heading: "Development",
        body: "Add your development notes here — mechanism design, competition strategy integration, and build iterations.",
      },
    ],
  },
  {
    id: "renovation",
    title: "Renovation",
    shortDesc: "Custom model of my house after a 2-story renovation.",
    image: "images/Screenshot 2025-10-11 163315.png",
    alt: "Renovation",
    sections: [
      {
        heading: "Overview",
        body: "Designed in Autodesk Revit as a custom model of my house after a 2-story renovation.",
      },
      {
        heading: "Development",
        body: "Add your development notes here — modeling process, architectural details, and Revit workflow.",
      },
    ],
  },
];

function getProjectById(id) {
  if (id === "dexter-demo") id = "dexter";
  return PROJECTS.find((p) => p.id === id);
}

function getProjectIndex(id) {
  return PROJECTS.findIndex((p) => p.id === id);
}

function getAdjacentProject(id, direction) {
  const index = getProjectIndex(id);
  if (index === -1) return null;
  const next = (index + direction + PROJECTS.length) % PROJECTS.length;
  return PROJECTS[next];
}
