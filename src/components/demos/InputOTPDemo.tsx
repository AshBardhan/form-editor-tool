"use client";

import { useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/InputOTP";
import { Label } from "@/components/ui/Label";
import { Button } from "@/components/ui/Button";

/**
 * InputOTP Component Demo
 * Showcases various use cases for OTP (One-Time Password) input
 */
export function InputOTPDemo() {
  const [value, setValue] = useState("");
  const [sixDigit, setSixDigit] = useState("");
  const [verificationCode, setVerificationCode] = useState("");

  return (
    <div className="space-y-12">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold mb-3">InputOTP Component</h2>
        <p className="text-lg text-muted-foreground">
          Specialized input for one-time passwords, verification codes, and PIN
          entries with individual character slots.
        </p>
      </div>

      {/* Basic OTP */}
      <section>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">Basic OTP Input</h3>
          <p className="text-muted-foreground">Standard 4-digit OTP input</p>
        </div>

        <div className="space-y-4">
          <Label htmlFor="otp-basic">Enter 4-digit code</Label>
          <InputOTP maxLength={4} value={value} onChange={setValue}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
            </InputOTPGroup>
          </InputOTP>
          <p className="text-sm text-muted-foreground">
            Current value: {value || "(empty)"}
          </p>
        </div>
      </section>

      {/* 6-Digit Code */}
      <section>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">6-Digit Code</h3>
          <p className="text-muted-foreground">
            OTP input with separator for better readability
          </p>
        </div>

        <div className="space-y-4">
          <Label htmlFor="otp-six-digit">Enter 6-digit verification code</Label>
          <InputOTP maxLength={6} value={sixDigit} onChange={setSixDigit}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          <p className="text-sm text-muted-foreground">
            Entered: {sixDigit.length}/6 digits
          </p>
        </div>
      </section>

      {/* Pattern Validation */}
      <section>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">Pattern Validation</h3>
          <p className="text-muted-foreground">
            OTP input with numeric-only pattern
          </p>
        </div>

        <div className="space-y-4">
          <Label htmlFor="otp-numeric">Numeric code only</Label>
          <InputOTP maxLength={4} pattern="[0-9]*">
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
            </InputOTPGroup>
          </InputOTP>
          <p className="text-sm text-muted-foreground">
            Only numbers 0-9 are accepted
          </p>
        </div>
      </section>

      {/* Disabled State */}
      <section>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">Disabled State</h3>
          <p className="text-muted-foreground">OTP input in disabled state</p>
        </div>

        <div className="space-y-4">
          <Label htmlFor="otp-disabled">Disabled OTP input</Label>
          <InputOTP maxLength={4} disabled value="1234">
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
            </InputOTPGroup>
          </InputOTP>
          <p className="text-sm text-muted-foreground">
            Input is disabled and cannot be edited
          </p>
        </div>
      </section>

      {/* Real-world Example */}
      <section>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">Real-world Example</h3>
          <p className="text-muted-foreground">Complete verification flow</p>
        </div>

        <div className="space-y-6">
          <div>
            <h4 className="font-semibold mb-2">Two-Factor Authentication</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Enter the 6-digit code from your authenticator app
            </p>
          </div>

          <div className="space-y-4">
            <Label htmlFor="otp-verification">Verification Code</Label>
            <InputOTP
              maxLength={6}
              value={verificationCode}
              onChange={setVerificationCode}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>

            <div className="flex gap-2">
              <Button
                disabled={verificationCode.length !== 6}
                onClick={() => {
                  alert(`Verifying code: ${verificationCode}`);
                  setVerificationCode("");
                }}
              >
                Verify
              </Button>
              <Button variant="outline" onClick={() => setVerificationCode("")}>
                Clear
              </Button>
            </div>

            <p className="text-xs text-muted-foreground">
              Didn't receive a code?{" "}
              <button className="text-primary hover:underline">
                Resend code
              </button>
            </p>
          </div>
        </div>
      </section>

      {/* Multiple Formats */}
      <section>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">Multiple Formats</h3>
          <p className="text-muted-foreground">
            Different OTP length configurations
          </p>
        </div>

        <div className="space-y-6">
          <div className="space-y-3">
            <Label>4-Digit PIN</Label>
            <InputOTP maxLength={4}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
              </InputOTPGroup>
            </InputOTP>
          </div>

          <div className="space-y-3">
            <Label>5-Digit Code</Label>
            <InputOTP maxLength={5}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
              </InputOTPGroup>
            </InputOTP>
          </div>

          <div className="space-y-3">
            <Label>8-Digit Code (Grouped)</Label>
            <InputOTP maxLength={8}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
                <InputOTPSlot index={6} />
                <InputOTPSlot index={7} />
              </InputOTPGroup>
            </InputOTP>
          </div>
        </div>
      </section>

      {/* Usage Example */}
      <section>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">Usage Example</h3>
          <p className="text-muted-foreground">
            How to use the InputOTP component in your code
          </p>
        </div>

        <div className="p-6 rounded-lg bg-gray-200">
          <pre className="text-sm bg-muted p-4 rounded-md overflow-x-auto">
            <code>{`import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/InputOTP";

// Basic 4-digit OTP
const [value, setValue] = useState("");
<InputOTP maxLength={4} value={value} onChange={setValue}>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
    <InputOTPSlot index={3} />
  </InputOTPGroup>
</InputOTP>

// 6-digit with separator
<InputOTP maxLength={6}>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
  </InputOTPGroup>
  <InputOTPSeparator />
  <InputOTPGroup>
    <InputOTPSlot index={3} />
    <InputOTPSlot index={4} />
    <InputOTPSlot index={5} />
  </InputOTPGroup>
</InputOTP>

// Numeric only
<InputOTP maxLength={4} pattern="[0-9]*">
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    {/* ... */}
  </InputOTPGroup>
</InputOTP>

// Disabled
<InputOTP maxLength={4} disabled value="1234">
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    {/* ... */}
  </InputOTPGroup>
</InputOTP>`}</code>
          </pre>
        </div>
      </section>

      {/* Props Documentation */}
      <section>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">Props</h3>
          <p className="text-muted-foreground">
            Available props for the InputOTP components
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 pr-4 font-semibold">Prop</th>
                <th className="text-left py-2 pr-4 font-semibold">Type</th>
                <th className="text-left py-2 pr-4 font-semibold">Default</th>
                <th className="text-left py-2 font-semibold">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr>
                <td className="py-3 pr-4 font-mono text-xs">maxLength</td>
                <td className="py-3 pr-4 font-mono text-xs">number</td>
                <td className="py-3 pr-4">-</td>
                <td className="py-3">Maximum number of characters</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-mono text-xs">value</td>
                <td className="py-3 pr-4 font-mono text-xs">string</td>
                <td className="py-3 pr-4">-</td>
                <td className="py-3">Controlled value</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-mono text-xs">onChange</td>
                <td className="py-3 pr-4 font-mono text-xs">function</td>
                <td className="py-3 pr-4">-</td>
                <td className="py-3">Callback when value changes</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-mono text-xs">pattern</td>
                <td className="py-3 pr-4 font-mono text-xs">string</td>
                <td className="py-3 pr-4">-</td>
                <td className="py-3">Regex pattern for validation</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-mono text-xs">disabled</td>
                <td className="py-3 pr-4 font-mono text-xs">boolean</td>
                <td className="py-3 pr-4 font-mono text-xs">false</td>
                <td className="py-3">Disable the input</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-mono text-xs">className</td>
                <td className="py-3 pr-4 font-mono text-xs">string</td>
                <td className="py-3 pr-4">-</td>
                <td className="py-3">Additional CSS classes</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
