export class CardSets{
  #cardSets = {};

  /** Constructor */
  constructor() {
    this.#loadCardSets();
  }

  /** Load card set data from localStorage */
  #loadCardSets() {
    const cardSets = localStorage.getItem('cardSets');
    this.#cardSets = cardSets ? JSON.parse(cardSets) : {};
  }

  /**
   * Determine the number of currently existing card sets
   * @returns {number}
   */
  getCardSetCount() {
    return Object.keys(this.#cardSets).length;
  }

  /**
   * Get a card set with a given setId
   * @param setId
   * @param shuffle
   * @returns {*}
   */
  getCardSet(setId, shuffle=false) {
    if (!this.#cardSets[setId]) {
      throw new Error(`Card set with id ${setId} does not exist.`);
    }

    if (shuffle) {
      const shuffledCardSet = structuredClone(this.#cardSets[setId]);
      for (let i = shuffledCardSet.images.length-1; i > 0; --i) {
        const j = Math.floor(Math.random() * (i+1));
        [shuffledCardSet.images[i], shuffledCardSet.images[j]] =
          [shuffledCardSet.images[j], shuffledCardSet.images[i]];
      }
      return shuffledCardSet;
    }

    return this.#cardSets[setId];
  }

  /**
   * Get the full set of card set data
   * @returns {{}}
   */
  getCardSets() {
    return this.#cardSets;
  }

  /**
   * Create a card set with a given name, and save to localStorage
   * @param name
   * @param size
   * @param imageArray
   * @return String setId
   */
  createCardSet(name, size, imageArray) {
    const setId = Math.random().toString(36).substring(0, 32);
    this.#cardSets[setId] = {
      name,
      size,
      images: imageArray,
    };
    this.#saveCardSets();
    return setId;
  }

  /**
   * Update a card set by its ID, and save to localStorage
   * @param setId
   * @param name
   * @param size
   * @param imageArray
   */
  updateCardSet(setId, name, size, imageArray) {
    this.#cardSets[setId] = {
      name,
      size,
      images: imageArray,
    };
    this.#saveCardSets();
  }

  /**
   * Delete a card set with a given setId, and save to localStorage
   * @param setId
   */
  deleteCardSet(setId) {
    if (!this.#cardSets[setId]) {
      throw new Error(`Card set with id ${setId} does not exist.`);
    }
    delete this.#cardSets[setId];
    this.#saveCardSets();
  }

  #saveCardSets() {
    localStorage.setItem('cardSets', JSON.stringify(this.#cardSets));
  }
}
