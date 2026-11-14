// Arc-length spacing keeps stars consistent across mouse and touch sampling rates.
export function star(ctx, point, color, size) {
  const radius = Math.max(4, size * .28);
  ctx.save();
  ctx.globalCompositeOperation = 'source-over';
  ctx.globalAlpha = 1;
  ctx.shadowColor = color;
  ctx.shadowBlur = radius * 2.5;
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(point.x, point.y - radius);
  ctx.lineTo(point.x + radius * .3, point.y - radius * .3);
  ctx.lineTo(point.x + radius, point.y);
  ctx.lineTo(point.x + radius * .3, point.y + radius * .3);
  ctx.lineTo(point.x, point.y + radius);
  ctx.lineTo(point.x - radius * .3, point.y + radius * .3);
  ctx.lineTo(point.x - radius, point.y);
  ctx.lineTo(point.x - radius * .3, point.y - radius * .3);
  ctx.closePath();
  ctx.fill();
  ctx.shadowBlur = 0;
  ctx.fillStyle = '#fff5dd';
  ctx.fillRect(point.x - 1.5, point.y - 1.5, 3, 3);
  ctx.restore();
}
export function segment(ctx, a, b, stroke) {
  const length = Math.hypot(b.x - a.x, b.y - a.y);
  ctx.save();
  ctx.globalCompositeOperation = stroke.erase ? 'destination-out' : 'source-over';
  ctx.strokeStyle = stroke.color;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.lineWidth = stroke.erase ? stroke.size * 1.4 : Math.max(1.5, stroke.size * .18);
  ctx.globalAlpha = stroke.erase ? 1 : .65;
  ctx.beginPath();
  ctx.moveTo(a.x, a.y);
  ctx.lineTo(b.x + .01, b.y + .01);
  ctx.stroke();
  if (!stroke.erase) {
    // Fine parallel wax marks retain the crayon feel between the stars.
    ctx.globalAlpha = .2;
    ctx.lineWidth = 1;
    for (const offset of [-2, 2]) {
      ctx.beginPath();
      ctx.moveTo(a.x + offset, a.y);
      ctx.lineTo(b.x + offset, b.y);
      ctx.stroke();
    }
  }
  ctx.restore();
  if (stroke.erase) return;
  const spacing = 30 + stroke.size * .8;
  const travelled = stroke.travelled || 0;
  if (!stroke.started) { star(ctx, a, stroke.color, stroke.size); stroke.started = true; }
  let next = (Math.floor(travelled / spacing) + 1) * spacing;
  while (length > 0 && next <= travelled + length) {
    const fraction = (next - travelled) / length;
    star(ctx, { x: a.x + (b.x - a.x) * fraction, y: a.y + (b.y - a.y) * fraction }, stroke.color, stroke.size);
    next += spacing;
  }
  stroke.travelled = travelled + length;
}
