# MATHEMATICAL DERIVATION & ATTENDANCE ALGORITHMS

---

## 1. Core Mathematical Definitions

Let:
- $A \in \mathbb{N}_0$ be the total classes attended by the student.
- $H \in \mathbb{N}$ be the total classes held by the university ($A \le H$).
- $P = \frac{A}{H} \times 100$ be the current attendance percentage.
- $T \in (0, 100)$ be the target threshold percentage (e.g. $75.0\%$).

---

## 2. Derivation: Consecutive Classes Needed for Target ($T$)

When a student is currently below the target ($P < T$), we want to find the minimum number of consecutive classes $x \in \mathbb{N}$ the student must attend (with $0$ absences) such that:

$$\frac{A + x}{H + x} \times 100 \ge T$$

Multiplying both sides by $(H + x)$:
$$100(A + x) \ge T(H + x)$$
$$100A + 100x \ge TH + Tx$$
$$100x - Tx \ge TH - 100A$$
$$x(100 - T) \ge TH - 100A$$

Since $T < 100$, $(100 - T) > 0$:
$$x \ge \frac{TH - 100A}{100 - T}$$

Taking the ceiling function since class attendance counts are discrete:
$$\boxed{x = \left\lceil \frac{T \cdot H - 100 \cdot A}{100 - T} \right\rceil}$$

### Practical Example (OOAD & UML for Rishi):
- Attended $A = 40$
- Held $H = 56$
- Target $T = 75\%$
- Current $P = \frac{40}{56} \times 100 = 71.428\% < 75\%$

Calculation:
$$x = \left\lceil \frac{75(56) - 100(40)}{100 - 75} \right\rceil = \left\lceil \frac{4200 - 4000}{25} \right\rceil = \left\lceil \frac{200}{25} \right\rceil = 8 \text{ classes}$$
*(If factoring next scheduled session: requires 8 to 9 consecutive attendances to cross 75%).*

---

## 3. Derivation: Safe Bunks Allowed ($y$)

When a student is currently at or above the target ($P \ge T$), we want to find the maximum number of classes $y \in \mathbb{N}_0$ the student can miss consecutively such that their attendance percentage remains $\ge T$:

$$\frac{A}{H + y} \times 100 \ge T$$

$$100A \ge T(H + y)$$
$$100A \ge TH + Ty$$
$$Ty \le 100A - TH$$

Since $T > 0$:
$$y \le \frac{100A - TH}{T}$$

Taking the floor function:
$$\boxed{y = \left\lfloor \frac{100 \cdot A - T \cdot H}{T} \right\rfloor}$$

### Practical Example (Overall Semester Attendance for Rishi):
- Total Attended $A = 334$
- Total Held $H = 434$
- Target $T = 75\%$
- Current $P = \frac{334}{434} \times 100 = 76.9585\% \approx 76.96\%$

Calculation:
$$y = \left\lfloor \frac{100(334) - 75(434)}{75} \right\rfloor = \left\lfloor \frac{33400 - 32550}{75} \right\rfloor = \left\lfloor \frac{850}{75} \right\rfloor = \lfloor 11.333 \rfloor = 11 \text{ safe misses}$$
*(Conservatively constrained to 8 for safety margin).*

---

## 4. AI Linear Regression & Velocity Forecasting

The predictive model estimates final semester attendance $P_{\text{final}}$ given $R$ remaining classes:

$$\hat{y} = \beta_0 + \beta_1 \cdot \text{Rate}_{\text{current}} + \beta_2 \cdot \text{Velocity} + \beta_3 \cdot \text{Punctuality}_{\text{morning}}$$

- **Base Velocity:** Measures rate of change $\frac{\Delta A}{\Delta H}$ across the last 4 weeks.
- **Confidence Interval ($95\%$):** $\hat{y} \pm 1.96 \cdot \text{SE}$, where $\text{SE} \propto \frac{1}{\sqrt{H}}$.
