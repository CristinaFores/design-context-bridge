import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  rgbaToHex,
  extractDesignSystem,
  analyzeStructure,
  describeComponentVariants,
} from '../dist/figma-rest/analysis.js';

test('rgbaToHex converts 0..1 floats to uppercase hex', () => {
  assert.equal(rgbaToHex({ r: 1, g: 0, b: 0 }), '#FF0000');
  assert.equal(rgbaToHex({ r: 0, g: 0, b: 0 }), '#000000');
  assert.equal(rgbaToHex({ r: 1, g: 1, b: 1 }), '#FFFFFF');
});

test('extractDesignSystem collects colors, type, spacing, radii', () => {
  const tree = {
    id: '0', name: 'root', type: 'DOCUMENT',
    children: [{
      id: '1', name: 'Card', type: 'FRAME',
      fills: [{ type: 'SOLID', color: { r: 1, g: 0, b: 0 }, opacity: 1, visible: true }],
      itemSpacing: 8, paddingLeft: 16, cornerRadius: 4,
      children: [
        { id: '2', name: 'Title', type: 'TEXT', style: { fontFamily: 'Inter', fontSize: 24, fontWeight: 700 } },
        { id: '3', name: 'Body', type: 'TEXT', style: { fontFamily: 'Inter', fontSize: 16, fontWeight: 400 } },
      ],
    }],
  };
  const ds = extractDesignSystem(tree);
  assert.equal(ds.colors[0].hex, '#FF0000');
  assert.equal(ds.typography.length, 2);
  assert.ok(ds.spacingScale.some((s) => s.value === 8));
  assert.ok(ds.spacingScale.some((s) => s.value === 16));
  assert.equal(ds.borderRadius[0].value, 4);
});

test('analyzeStructure suggests routes from screen names', () => {
  const tree = {
    id: '0', name: 'doc', type: 'DOCUMENT',
    children: [{
      id: 'p', name: 'Page 1', type: 'CANVAS',
      children: [
        { id: 'f1', name: 'Home', type: 'FRAME' },
        { id: 'f2', name: 'User Profile', type: 'FRAME' },
      ],
    }],
  };
  const result = analyzeStructure(tree);
  assert.deepEqual(result.suggestedRoutes, ['/', '/user-profile']);
});

test('describeComponentVariants parses variant property names', () => {
  const set = {
    id: 'cs', name: 'Button', type: 'COMPONENT_SET',
    componentPropertyDefinitions: { State: { type: 'VARIANT' } },
    children: [
      { id: 'v1', name: 'State=Default', type: 'COMPONENT' },
      { id: 'v2', name: 'State=Hover', type: 'COMPONENT' },
    ],
  };
  const result = describeComponentVariants(set);
  assert.equal(result.variantCount, 2);
  assert.equal(result.variants[1].properties.State, 'Hover');
});
