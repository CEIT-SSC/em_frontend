/**
 * Example component demonstrating Ant Design colors with Tailwind CSS
 * This shows how to use the antd color palette in your components
 */

import {
  getTextColor,
  getBgColor,
  getBorderColor,
  getSemanticColor,
  buttonVariants,
} from "../../lib/utils/antd-colors";

export function AntdColorsExample() {
  return (
    <div className={`p-6 ${getBgColor("base")} min-h-screen`}>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className={`text-3xl font-bold ${getTextColor("primary")} mb-2`}>
            Ant Design Colors with Tailwind CSS
          </h1>
          <p className={getTextColor("secondary")}>
            Examples of using Ant Design color tokens as Tailwind classes
          </p>
        </div>

        {/* Color Palette */}
        <div
          className={`${getBgColor(
            "container"
          )} rounded-lg p-6 ${getBorderColor("primary")} border`}
        >
          <h2
            className={`text-xl font-semibold ${getTextColor("primary")} mb-4`}
          >
            Semantic Colors
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {/* Primary */}
            <div className="space-y-2">
              <div
                className={`w-full h-16 bg-antd-primary-500 rounded-lg`}
              ></div>
              <p className={`text-sm ${getTextColor("secondary")}`}>Primary</p>
            </div>

            {/* Success */}
            <div className="space-y-2">
              <div
                className={`w-full h-16 bg-antd-success-500 rounded-lg`}
              ></div>
              <p className={`text-sm ${getTextColor("secondary")}`}>Success</p>
            </div>

            {/* Warning */}
            <div className="space-y-2">
              <div
                className={`w-full h-16 bg-antd-warning-500 rounded-lg`}
              ></div>
              <p className={`text-sm ${getTextColor("secondary")}`}>Warning</p>
            </div>

            {/* Error */}
            <div className="space-y-2">
              <div className={`w-full h-16 bg-antd-error-500 rounded-lg`}></div>
              <p className={`text-sm ${getTextColor("secondary")}`}>Error</p>
            </div>

            {/* Info */}
            <div className="space-y-2">
              <div className={`w-full h-16 bg-antd-info-500 rounded-lg`}></div>
              <p className={`text-sm ${getTextColor("secondary")}`}>Info</p>
            </div>
          </div>
        </div>

        {/* Text Examples */}
        <div
          className={`${getBgColor(
            "container"
          )} rounded-lg p-6 ${getBorderColor("primary")} border`}
        >
          <h2
            className={`text-xl font-semibold ${getTextColor("primary")} mb-4`}
          >
            Text Hierarchy
          </h2>
          <div className="space-y-2">
            <p className={`text-lg ${getTextColor("primary")}`}>
              Primary text - most important content
            </p>
            <p className={`text-base ${getTextColor("secondary")}`}>
              Secondary text - supporting information
            </p>
            <p className={`text-sm ${getTextColor("tertiary")}`}>
              Tertiary text - less important details
            </p>
            <p className={`text-sm ${getTextColor("quaternary")}`}>
              Quaternary text - least important content
            </p>
            <p
              className={`text-sm text-antd-text-disabled dark:text-antd-dark-text-disabled`}
            >
              Disabled text - inactive content
            </p>
          </div>
        </div>

        {/* Button Examples */}
        <div
          className={`${getBgColor(
            "container"
          )} rounded-lg p-6 ${getBorderColor("primary")} border`}
        >
          <h2
            className={`text-xl font-semibold ${getTextColor("primary")} mb-4`}
          >
            Button Variants
          </h2>
          <div className="flex flex-wrap gap-4">
            <button
              className={`px-4 py-2 rounded-lg transition-colors duration-200 ${buttonVariants.primary.enabled}`}
            >
              Primary Button
            </button>
            <button
              className={`px-4 py-2 rounded-lg transition-colors duration-200 ${buttonVariants.success.enabled}`}
            >
              Success Button
            </button>
            <button
              className={`px-4 py-2 rounded-lg transition-colors duration-200 ${buttonVariants.warning.enabled}`}
            >
              Warning Button
            </button>
            <button
              className={`px-4 py-2 rounded-lg transition-colors duration-200 ${buttonVariants.error.enabled}`}
            >
              Error Button
            </button>
            <button
              className={`px-4 py-2 rounded-lg transition-colors duration-200 ${buttonVariants.ghost.enabled}`}
            >
              Ghost Button
            </button>
            <button
              disabled
              className={`px-4 py-2 rounded-lg ${buttonVariants.primary.disabled}`}
            >
              Disabled Button
            </button>
          </div>
        </div>

        {/* Cards Example */}
        <div
          className={`${getBgColor(
            "container"
          )} rounded-lg p-6 ${getBorderColor("primary")} border`}
        >
          <h2
            className={`text-xl font-semibold ${getTextColor("primary")} mb-4`}
          >
            Card Components
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div
              className={`${getBgColor(
                "elevated"
              )} rounded-lg p-4 ${getBorderColor(
                "secondary"
              )} border shadow-sm`}
            >
              <h3 className={`font-semibold ${getTextColor("primary")} mb-2`}>
                Elevated Card
              </h3>
              <p className={getTextColor("secondary")}>
                This card uses the elevated background color for better visual
                hierarchy.
              </p>
            </div>
            <div
              className={`${getBgColor(
                "spotlight"
              )} rounded-lg p-4 ${getBorderColor(
                "secondary"
              )} border shadow-sm`}
            >
              <h3 className={`font-semibold ${getTextColor("primary")} mb-2`}>
                Spotlight Card
              </h3>
              <p className={getTextColor("secondary")}>
                This card uses the spotlight background color to draw attention.
              </p>
            </div>
          </div>
        </div>

        {/* Usage Instructions */}
        <div
          className={`${getBgColor(
            "container"
          )} rounded-lg p-6 ${getBorderColor("primary")} border`}
        >
          <h2
            className={`text-xl font-semibold ${getTextColor("primary")} mb-4`}
          >
            How to Use
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className={`font-semibold ${getTextColor("primary")} mb-2`}>
                Direct Class Usage:
              </h3>
              <code
                className={`block p-3 ${getBgColor(
                  "layout"
                )} rounded text-sm ${getTextColor("secondary")}`}
              >
                {`<div className="bg-antd-primary-500 text-white">Primary background</div>`}
              </code>
            </div>

            <div>
              <h3 className={`font-semibold ${getTextColor("primary")} mb-2`}>
                Using Helper Functions:
              </h3>
              <code
                className={`block p-3 ${getBgColor(
                  "layout"
                )} rounded text-sm ${getTextColor("secondary")}`}
              >
                {`<div className={\`\${getBgColor('container')} \${getTextColor('primary')}\`}>Content</div>`}
              </code>
            </div>

            <div>
              <h3 className={`font-semibold ${getTextColor("primary")} mb-2`}>
                Button Variants:
              </h3>
              <code
                className={`block p-3 ${getBgColor(
                  "layout"
                )} rounded text-sm ${getTextColor("secondary")}`}
              >
                {`<button className={\`\${buttonVariants.primary.enabled}\`}>Button</button>`}
              </code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
