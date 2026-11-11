/**
 * dsh-parchment-theme — Host half.
 *
 * Everything is Client-side: the theme is a token layer stacked over the active
 * palette through `ctx.theme.overrideTokens`, so the Host registers no route, no
 * timer, and no service. This row exists only so the bundle has a Host entry the
 * Loader can mount; without it the Client half would never be served.
 */

export const name = 'dsh-parchment-theme';

export function apply() {}
