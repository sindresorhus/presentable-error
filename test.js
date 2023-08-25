import test from 'ava';
import {PresentableError, isPresentableError, makePresentableError} from './index.js';

test('PresentableError', t => {
	const error = new PresentableError('x');
	t.true(error.isPresentable);
});

test('isPresentableError', t => {
	const error = new PresentableError('x');
	t.true(isPresentableError(error));
	t.false(isPresentableError(new Error('x')));

	const error2 = new Error('x');
	error2.isPresentable = true;
	t.true(isPresentableError(error2));
});

test('makePresentableError', t => {
	const error = new Error('x');
	makePresentableError(error);
	t.true(isPresentableError(error));
	t.true(error.isPresentable);

	t.notThrows(() => {
		makePresentableError(Object.seal(new PresentableError('x')));
	});
});
