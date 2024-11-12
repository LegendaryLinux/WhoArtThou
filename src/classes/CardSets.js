export class CardSets{
  #cardSets = {};

  /** Constructor */
  constructor() {
    this.loadCardSets();
  }

  /** Load card set data from localStorage */
  loadCardSets() {
    const cardSets = localStorage.getItem('cardSets');
    this.#cardSets = cardSets ? JSON.parse(cardSets) : {};
  }

  /**
   * Get a card set with a given name
   * @param name
   * @returns {*}
   */
  getCardSet(name) {
    if (!this.#cardSets[name]) {
      throw new Error(`Card set with name ${name} does not exist.`);
    }
    return this.#cardSets[name];
  }

  /**
   * Get the full set of card set data
   * @returns {{}}
   */
  getCardSets() {
    return this.#cardSets;
  }

  /**
   * Set a card set with a given name, and save to localStorage
   * @param name
   * @param size
   * @param imageArray
   */
  setCardSet(name, size, imageArray) {
    const setId = crypto.randomUUID();
    this.#cardSets[setId] = {
      setId,
      name,
      size,
      images: imageArray,
    };
    this.saveCardSets();
  }

  /**
   * Delete a card set with a given name, and save to localStorage
   * @param name
   */
  deleteCardSet(name) {
    if (!this.#cardSets[name]) {
      throw new Error(`Card set with name ${name} does not exist.`);
    }
    delete this.#cardSets[name];
    this.saveCardSets();
  }

  saveCardSets() {
    localStorage.setItem('cardSets', JSON.stringify(this.#cardSets));
  }
}
