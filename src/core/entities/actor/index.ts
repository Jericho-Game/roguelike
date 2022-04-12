import AbstractEntity from '../abstract/entity';

export default class Actor extends AbstractEntity {
  private damage = 25;

  health = 100;

  attack(entity: Actor) {
    entity.defend(this);
  }

  defend(entity: Actor) {
    if (this.health > 0) {
      this.health -= entity.damage;
    }
  }
}
