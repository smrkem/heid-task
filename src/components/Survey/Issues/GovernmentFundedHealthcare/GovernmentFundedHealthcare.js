import imgSrc from './issue-government-funded-healthcare.jpg';

export default {
  title: "Government Funded Healthcare",
  problem_statement: "Should the Government Fund Universal Healthcare?",
  position_statements: {
    for_statement: "Public Healthcare",
    alternate_statement: "Private Healthcare",
    for: {
        for_statement: "FOR Public Healthcare",
        against_statement: "AGAINST Private Healthcare",
    },
    against: {
        for_statement: "FOR Private Healthcare",
        against_statement: "AGAINST Public Healthcare",
    },
  },
  image_src: imgSrc,
  description: [
    "This topic focuses on whether healthcare is a basic human right and whether tax payer money collected by the government should also help fund free healthcare for its citizens. Here are a few arguments presented by opposite sides of the debate."
  ], 
  pros: [
    "Privatizing healthcare will increase prices and cause economic strain on families. In 2007, about 62% of US bankruptcies were related to medical expenses.",
    "Privatizing healthcare would reduce the overall health and wellbeing of the country, as many individuals would not be able to afford private medical services.",
    "Universal healthcare enhances economic productivity by increasing overall health so more people can work and contribute to society as a whole.",
    "Government funded healthcare also reduces the strain of insurance coverage from businesses."
  ],
  cons: [
    "People with high incomes, and subsequently pay more taxes then those with lower incomes, should not be forced to pay the medical bills of others due to incongruent taxation.",
    "Privatized healthcare will provide higher quality services – you pay for what you get. Not all healthcare providers are of the same quality.",
    "Government-funded healthcare will rise taxes.",
    "A right to healthcare causes an overuse of services while having to manage a rationing of resources."
  ]
}
