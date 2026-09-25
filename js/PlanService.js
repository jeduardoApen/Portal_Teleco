export class PlanService {
  constructor() {
    this.plans = [
      { id: "cyber-basic", name: "CYBER BASIC", minutes: 30, price: "Q5" },
      { id: "cyber-plus", name: "CYBER PLUS", minutes: 60, price: "Q10" },
      { id: "cyber-max", name: "CYBER MAX", minutes: 120, price: "Q15" },
    ];
  }

  getAll() {
    return this.plans.map((plan) => ({ ...plan }));
  }

  getById(id) {
    const plan = this.plans.find((p) => p.id === id);
    return plan ? { ...plan } : null;
  }
}
