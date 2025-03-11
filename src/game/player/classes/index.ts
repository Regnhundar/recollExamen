import { pyroClass } from './pyro';
import { zerkerClass } from './zerker';

const unsortedClasses = [pyroClass, zerkerClass];
export const classes = unsortedClasses.sort((a, b) => a.id.localeCompare(b.id));
