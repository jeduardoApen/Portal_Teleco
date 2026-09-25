const APPROVED_SHOW_MS = 900;

export class PortalView {
  constructor(planService, paymentSimulator) {
    this.planService = planService;
    this.paymentSimulator = paymentSimulator;
    this.selectedPlan = null;
  }

  init() {
    this.plansContainer = document.getElementById("plans");
    this.modal = document.getElementById("modal");
    this.modalName = document.getElementById("modal-plan-name");
    this.modalPrice = document.getElementById("modal-plan-price");
    this.modalDuration = document.getElementById("modal-plan-duration");
    this.payButton = document.getElementById("btn-pay");
    this.stages = Array.from(this.modal.querySelectorAll("[data-stage]"));

    this.renderPlans();
    this.bindEvents();
  }

  renderPlans() {
    if (!this.plansContainer) return;

    const plans = this.planService.getAll();
    const fragment = document.createDocumentFragment();

    plans.forEach((plan) => {
      fragment.appendChild(this.createPlanCard(plan));
    });

    this.plansContainer.appendChild(fragment);
  }

  createPlanCard(plan) {
    const card = document.createElement("article");
    card.className = "plan-card";
    card.setAttribute("data-plan-id", plan.id);

    const name = document.createElement("h3");
    name.className = "plan-card__name";
    name.textContent = plan.name;

    const minutes = document.createElement("p");
    minutes.className = "plan-card__minutes";
    minutes.textContent = `${plan.minutes} minutos`;

    const price = document.createElement("p");
    price.className = "plan-card__price";
    price.textContent = plan.price;

    const button = document.createElement("button");
    button.type = "button";
    button.className = "btn btn--outline plan-card__action";
    button.textContent = "SELECCIONAR";

    button.addEventListener("click", () => this.onSelectPlan(plan));

    card.append(name, minutes, price, button);
    return card;
  }

  bindEvents() {
    this.payButton.addEventListener("click", () => this.onPay());

    this.modal
      .querySelectorAll("[data-close]")
      .forEach((el) => el.addEventListener("click", () => this.closeModal()));

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && !this.modal.hidden) {
        this.closeModal();
      }
    });
  }

  onSelectPlan(plan) {
    this.selectedPlan = plan;
    this.modalName.textContent = plan.name;
    this.modalPrice.textContent = plan.price;
    this.modalDuration.textContent = `${plan.minutes} minutos`;
    this.showStage("summary");
    this.openModal();
  }

  onPay() {
    if (!this.selectedPlan || this.payButton.disabled) return;

    this.payButton.disabled = true;
    this.payButton.textContent = "PROCESANDO...";

    this.paymentSimulator.process(this.selectedPlan).then((result) => {
      this.payButton.disabled = false;
      this.payButton.textContent = "SIMULAR PAGO";

      this.showStage("approved");

      setTimeout(() => {
        this.showStage("voucher");
        const voucherInput = document.getElementById("voucher-modal");
        if (voucherInput) voucherInput.focus();
      }, APPROVED_SHOW_MS);
    });
  }

  openModal() {
    this.modal.hidden = false;
    this.payButton.focus();
  }

  closeModal() {
    this.modal.hidden = true;
    this.payButton.disabled = false;
    this.payButton.textContent = "SIMULAR PAGO";
  }

  showStage(name) {
    this.stages.forEach((stage) => {
      stage.hidden = stage.dataset.stage !== name;
    });
  }
}
