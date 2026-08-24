export const vertexShaderSource = `
attribute vec2 a_position;

void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

export const fragmentShaderSource = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
uniform float u_pointerStrength;
uniform float u_pointerRadius;
uniform float u_rotationSpeed;
uniform int u_variant;
uniform int u_shapeFrom;
uniform int u_shapeTo;
uniform float u_transition;

#define STUDIO_BLUE vec3(0.031, 0.471, 0.976)
#define STUDIO_LIGHT vec3(0.392, 0.729, 1.0)
#define STUDIO_DEEP vec3(0.0, 0.208, 0.627)

mat2 rotate2d(float angle) {
  float s = sin(angle);
  float c = cos(angle);
  return mat2(c, -s, s, c);
}

float segmentDistance(vec2 p, vec2 a, vec2 b) {
  vec2 pa = p - a;
  vec2 ba = b - a;
  float denominator = max(dot(ba, ba), 0.00001);
  float h = clamp(dot(pa, ba) / denominator, 0.0, 1.0);
  return length(pa - ba * h);
}

float neonSegment(vec2 p, vec2 a, vec2 b, float width) {
  float d = segmentDistance(p, a, b);
  float core = smoothstep(width * 1.35, width * 0.18, d);
  float halo = exp(-d * 82.0) * 0.22;
  return core * 1.12 + halo;
}

float nodeGlow(vec2 p, vec2 point, float size) {
  float d = length(p - point);
  return smoothstep(size, size * 0.16, d) + exp(-d * 68.0) * 0.18;
}

float studioCurve(vec2 p) {
  float line = 0.0;
  line += neonSegment(p, vec2(-0.48, 0.62), vec2(-0.16, 0.78), 0.006);
  line += neonSegment(p, vec2(-0.16, 0.78), vec2(0.22, 0.60), 0.006);
  line += neonSegment(p, vec2(0.22, 0.60), vec2(0.38, 0.31), 0.006);
  line += neonSegment(p, vec2(0.38, 0.31), vec2(0.12, 0.08), 0.006);
  line += neonSegment(p, vec2(0.12, 0.08), vec2(-0.20, -0.02), 0.006);
  line += neonSegment(p, vec2(-0.20, -0.02), vec2(-0.39, -0.29), 0.006);
  line += neonSegment(p, vec2(-0.39, -0.29), vec2(-0.16, -0.59), 0.006);
  line += neonSegment(p, vec2(-0.16, -0.59), vec2(0.20, -0.70), 0.006);
  line += neonSegment(p, vec2(0.20, -0.70), vec2(0.49, -0.49), 0.006);

  vec2 ribbon = p + vec2(-0.052, 0.02);
  line += neonSegment(ribbon, vec2(-0.44, 0.56), vec2(-0.14, 0.69), 0.0035) * 0.5;
  line += neonSegment(ribbon, vec2(-0.14, 0.69), vec2(0.16, 0.53), 0.0035) * 0.5;
  line += neonSegment(ribbon, vec2(0.16, 0.53), vec2(0.28, 0.31), 0.0035) * 0.5;
  line += neonSegment(ribbon, vec2(0.28, 0.31), vec2(0.06, 0.15), 0.0035) * 0.5;
  line += neonSegment(ribbon, vec2(0.06, 0.15), vec2(-0.20, 0.05), 0.0035) * 0.5;
  line += neonSegment(ribbon, vec2(-0.20, 0.05), vec2(-0.31, -0.22), 0.0035) * 0.5;
  line += neonSegment(ribbon, vec2(-0.31, -0.22), vec2(-0.12, -0.47), 0.0035) * 0.5;
  line += neonSegment(ribbon, vec2(-0.12, -0.47), vec2(0.18, -0.56), 0.0035) * 0.5;
  line += neonSegment(ribbon, vec2(0.18, -0.56), vec2(0.42, -0.40), 0.0035) * 0.5;

  line += nodeGlow(p, vec2(-0.48, 0.62), 0.025);
  line += nodeGlow(p, vec2(0.38, 0.31), 0.021);
  line += nodeGlow(p, vec2(-0.20, -0.02), 0.023);
  line += nodeGlow(p, vec2(-0.16, -0.59), 0.021);
  line += nodeGlow(p, vec2(0.49, -0.49), 0.026);
  return line;
}

float facadePlanes(vec2 p) {
  float line = 0.0;
  vec2 a = vec2(-0.72, 0.46);
  vec2 b = vec2(0.50, 0.68);
  vec2 c = vec2(0.72, -0.48);
  vec2 d = vec2(-0.52, -0.68);

  line += neonSegment(p, a, b, 0.0045);
  line += neonSegment(p, b, c, 0.0045);
  line += neonSegment(p, c, d, 0.0045);
  line += neonSegment(p, d, a, 0.0045);
  line += neonSegment(p, vec2(-0.48, 0.50), vec2(-0.31, -0.64), 0.003);
  line += neonSegment(p, vec2(-0.19, 0.56), vec2(-0.06, -0.59), 0.003);
  line += neonSegment(p, vec2(0.12, 0.61), vec2(0.20, -0.55), 0.003);
  line += neonSegment(p, vec2(0.39, 0.65), vec2(0.47, -0.51), 0.003);
  line += neonSegment(p, vec2(-0.66, 0.18), vec2(0.67, 0.34), 0.003);
  line += neonSegment(p, vec2(-0.61, -0.11), vec2(0.70, 0.05), 0.003);
  line += neonSegment(p, vec2(-0.57, -0.39), vec2(0.69, -0.23), 0.003);

  line += nodeGlow(p, a, 0.018);
  line += nodeGlow(p, b, 0.018);
  line += nodeGlow(p, c, 0.018);
  line += nodeGlow(p, d, 0.018);
  return line;
}

float radialLight(vec2 p) {
  float line = 0.0;
  float radius = length(p);
  line += smoothstep(0.008, 0.002, abs(radius - 0.28)) * 0.7;
  line += smoothstep(0.007, 0.002, abs(radius - 0.49)) * 0.45;
  line += neonSegment(p, vec2(0.0), vec2(0.0, 0.72), 0.0035);
  line += neonSegment(p, vec2(0.0), vec2(0.62, 0.36), 0.0035);
  line += neonSegment(p, vec2(0.0), vec2(0.62, -0.36), 0.0035);
  line += neonSegment(p, vec2(0.0), vec2(0.0, -0.72), 0.0035);
  line += neonSegment(p, vec2(0.0), vec2(-0.62, -0.36), 0.0035);
  line += neonSegment(p, vec2(0.0), vec2(-0.62, 0.36), 0.0035);
  line += nodeGlow(p, vec2(0.0), 0.05) * 0.9;
  return line;
}

float composition(vec2 p, int shape) {
  if (shape == 0) return studioCurve(p);
  if (shape == 1) return facadePlanes(p);
  return radialLight(p);
}

void main() {
  vec2 uv = (gl_FragCoord.xy / u_resolution.xy) * 2.0 - 1.0;
  float aspect = u_resolution.x / max(u_resolution.y, 1.0);
  uv.x *= aspect;

  vec2 mouse = u_mouse;
  mouse.x *= aspect;
  vec2 geometryCenter = vec2(-0.18, -0.02);
  vec2 p = uv - geometryCenter;
  vec2 localMouse = mouse - geometryCenter;
  float pointerDistance = length(p - localMouse);
  float pointerField = 1.0 - smoothstep(0.0, u_pointerRadius, pointerDistance);

  float rotation = u_time * u_rotationSpeed + localMouse.x * 0.045 * u_pointerStrength;
  p = rotate2d(rotation) * p;
  p -= localMouse * 0.018 * u_pointerStrength;

  if (u_variant == 1) {
    vec2 delta = p - localMouse;
    float safeDistance = max(length(delta), 0.025);
    float magneticField = exp(-safeDistance * safeDistance / max(u_pointerRadius * u_pointerRadius, 0.01));
    float elasticPulse = 0.82 + sin(u_time * 2.1 - safeDistance * 12.0) * 0.18;
    p -= normalize(delta) * magneticField * u_pointerStrength * 0.16 * elasticPulse;
    p += vec2(
      sin(p.y * 8.0 + u_time) * magneticField,
      cos(p.x * 7.0 - u_time * 0.8) * magneticField
    ) * 0.018;
  }

  float geometry;
  if (u_variant == 2) {
    float fromShape = composition(p, u_shapeFrom);
    float toShape = composition(p, u_shapeTo);
    float blend = smoothstep(0.0, 1.0, u_transition);
    geometry = mix(fromShape, toShape, blend);
  } else {
    geometry = studioCurve(p) * 0.88 + facadePlanes(p * 1.04) * 0.42;
  }

  float pulse = 0.82 + sin(u_time * 0.72 + p.x * 2.4) * 0.12;
  float pointerLight = pointerField * (0.24 + u_pointerStrength * 0.34);
  float intensity = geometry * (pulse + pointerLight);

  float verticalMix = clamp((p.y + 0.72) * 0.62, 0.0, 1.0);
  vec3 color = mix(STUDIO_DEEP, STUDIO_BLUE, 0.52 + verticalMix * 0.36);
  color = mix(color, STUDIO_LIGHT, pointerField * 0.58 + min(geometry, 1.0) * 0.12);

  float edgeFade = smoothstep(1.35, 0.42, length(uv * vec2(0.68, 0.92)));
  float lineAlpha = smoothstep(0.10, 0.92, intensity) * 0.62;
  float glowAlpha = min(intensity * 0.15, 0.18);
  float alpha = clamp((lineAlpha + glowAlpha) * edgeFade, 0.0, 0.78);
  gl_FragColor = vec4(color * alpha, alpha);
}
`;
