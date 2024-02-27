interface tabOption {
  title: string;
  tabAction: Function;
}

interface MultiTabProps {
  tabs: string[] | tabOption[];
  currentStep: number;
  goTo: (index: number) => void;
  //   action: (index: number, currentStep: number) => void;
}

const MultiTabs = ({ tabs = [], currentStep, goTo }: MultiTabProps) => {
  return (
    <>
      <ul className="flex justify-center items-center">
        {tabs.length &&
          tabs.map((tab, index) => {
            const tabPropIsString = typeof tab === "string";
            return (
              <li
                className={`flex justify-center items-center py-[0.5rem] px-[1rem] text-[15px] font-semibold border-b-[5px] ${
                  currentStep === index
                    ? "border-primary text-primary opacity-[1]"
                    : "border-gray-500 text-gray-500 opacity-[0.5]"
                } cursor-pointer min-w-fit`}
                key={index}
                onClick={() => {
                  if (!tabPropIsString) {
                    tab.tabAction(index, currentStep);
                  }
                  goTo(index);
                }}
              >
                {tabPropIsString ? tab : tab.title}
              </li>
            );
          })}
      </ul>
    </>
  );
};

export default MultiTabs;
